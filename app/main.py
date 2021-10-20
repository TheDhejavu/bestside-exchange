from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from fastapi import HTTPException, status
import json
from app.core.config import ALLOWED_HOSTS, DEBUG, PROJECT_NAME, VERSION
from app.core.socket_manager import manager
from fastapi import WebSocket, WebSocketDisconnect
from loguru import logger
from time import sleep
from app.services.compare_exchange import CompareExchange

exchange = CompareExchange()


def get_application() -> FastAPI:
    application = FastAPI(title=PROJECT_NAME, debug=DEBUG, version=VERSION)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=ALLOWED_HOSTS or ["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return application


app = get_application()


@app.get("/exchanges")
async def get_exchanges():
    try:
        response = await exchange.get_tickers()
        return JSONResponse(
            content=response,
            status_code=status.HTTP_200_OK
        )

    except Exception as e:
        logger.exception(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Oops!! something went wrong"
        )


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    try:
        logger.debug(f"Websocket::")
        await manager.connect(websocket)
        try:
            while True:
                # response = await exchange.get_tickers()
                # print(response)
                # json_string = json.dumps(response)
                await manager.broadcast("json_string")
                sleep(20)
        except WebSocketDisconnect:
            manager.disconnect(websocket)
    except Exception as e:
        logger.warning(f"Websocket Error: {e}")


@app.get('/')
async def root():
    return {
        'message': 'Welcome to BestSide Exchange Service.'
    }
