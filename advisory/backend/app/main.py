from typing import Union
from fastapi import Depends, FastAPI, HTTPException, Header
from fastapi.staticfiles import StaticFiles
from fastapi import APIRouter
from aiohttp import ClientSession


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

router = APIRouter(prefix='/api')

async def check_jwt_token(Authorization: Union[str, None] = Header(default=None)):
    if not Authorization:
        raise HTTPException(401, 'Authorization required')

    auth_type_token = Authorization.split()

    if len(auth_type_token) != 2:
        raise HTTPException(401, 'Authorization required')

    auth_type, token = auth_type_token

    if auth_type != "Bearer":
        raise HTTPException(401, 'Authorization required')

    # Отправляем токен на проверку
    async with ClientSession() as session:
        async with session.post('https://hack.invest-open.ru/jwt/verify', json={"jwt": token}) as response:
            status = response.status
            data = await response.read()

    return {"token": token, "verified": status == 200, "response": data}


async def verified_token(response = Depends(check_jwt_token)):
    if response.get('verified') == False:
        raise HTTPException(401, 'Token not verified')

    return True

@router.get('/check_token')
async def check_token(response = Depends(check_jwt_token)):
    return {'token': response.get('token', ''), 'verified': response.get('verified', False)}

@router.get('/')
async def root():
    return {'message': 'LeaderStat backend API'}

app.include_router(router)
