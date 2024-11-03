package com.example.simplemsgapp.controller;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;



public class MyWebSocketHandler extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        
        session.getAttributes().put("id", session.getId());
        sessions.add(session);

    }
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("Received: " + payload);
        broadcastMessage(payload, session);
    }

    private void broadcastMessage(String message, WebSocketSession session ) {
        
        synchronized (sessions) {
            for (WebSocketSession s : sessions) {
                
                if (!session.getId().equals(s.getId())){

                    try {
                        s.sendMessage(new TextMessage(message));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                }

                
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        sessions.remove(session);
    }
}
