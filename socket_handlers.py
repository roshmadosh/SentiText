from .main import socket_manager as sm

@sm.on('analyze')
async def handle_analyze(sid, data):
    await sm.emit('analyze', { 'data': 'random message' })