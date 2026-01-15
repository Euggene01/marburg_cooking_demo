import { useLanguage } from "../context/languageContext";
import { Box, Typography, TextField, Button, Paper, Avatar, IconButton } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

export default function ChatPage() {
    const [message, setMessage] = useState('');
    const [language, setLanguage] = useState('de');

    const labels = {
        de: {
            title: "Marburg Kocht Chat",
            placeholder: "Nachricht schreiben...",
            send: "Senden",
            online: "online"
        },
        en: {
            title: "Marburg Kocht Chat",
            placeholder: "Type a message...",
            send: "Send",
            online: "online"
        }
    };

    // templates
    const messages = [
        { id: 1, user: "John Wick", text: "Hello everyone!", time: "14:30", avatar: "J", isYou: false },
        { id: 2, user: "Donald Trump", text: "Who's making dessert?", time: "14:31", avatar: "A", isYou: false },
        { id: 3, user: "You", text: "I can bake a cake", time: "14:32", avatar: "YOU", isYou: true },
        { id: 4, user: "System", text: "Max joined the chat", time: "14:33", avatar: "⚡", isSystem: true },
        { id: 5, user: "John", text: "That sounds great!", time: "14:34", avatar: "J", isYou: false },
        { id: 6, user: "Anna", text: "I'll bring the drinks", time: "14:35", avatar: "A", isYou: false },
    ];

    const handleSend = () => {
        if (message.trim()) {
            console.log("Sent:", message);
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <Box sx={{
            height: "100vh",
            backgroundColor: "background.default",
            p: 0,
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Fixed header with shadow */}
            <Paper elevation={2} sx={{
                borderRadius: 0,
                py: 1.5,
                px: 3,
                backgroundColor: "white",
            }}>
                <Typography variant="h5" sx={{
                    fontWeight: "bold",
                    color: "#7EBC89",
                    textAlign: "center"
                }}>
                    Marburg Kocht Chat
                </Typography>
            </Paper>

            {/* Main chat container */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                px: { xs: 1, sm: 2, md: 3 }
            }}>
                <Paper elevation={1} sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    my: 2
                }}>
                    {/* Messages area - takes available space */}
                    <Box sx={{
                        flex: 1,
                        p: 1.5,
                        backgroundColor: '#fafafa',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        {messages.map((msg) => (
                            <Box key={msg.id} sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1,
                                flexDirection: msg.isYou ? 'row-reverse' : 'row'
                            }}>
                                {/* User avatars */}
                                <Avatar sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: '0.7rem',
                                    backgroundColor: msg.isSystem ? '#6c757d' :
                                        msg.isYou ? '#FE5D26' : '#7EBC89'
                                }}>
                                    {msg.avatar}
                                </Avatar>

                                {/* Message bubbles with reduced padding */}
                                <Box sx={{
                                    maxWidth: '70%',
                                    p: 1.2,  // Reduced padding inside message bubbles
                                    borderRadius: 2,  // Slightly less rounded
                                    backgroundColor: msg.isSystem ? 'transparent' :
                                        msg.isYou ? '#E3F2FD' : 'white',
                                    border: msg.isSystem ? 'none' :
                                        msg.isYou ? '1px solid #BBDEFB' : '1px solid #e0e0e0',
                                    boxShadow: msg.isSystem ? 'none' : '0 1px 1px rgba(0,0,0,0.1)'
                                }}>
                                    {/* Username and time in one line */}
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 0.3
                                    }}>
                                        <Typography variant="subtitle2" sx={{
                                            fontWeight: 'bold',
                                            fontSize: '0.75rem',
                                            color: msg.isSystem ? '#6c757d' : 'inherit'
                                        }}>
                                            {msg.user}
                                        </Typography>
                                        {/* Time on the right side */}
                                        <Typography variant="caption" sx={{
                                            color: '#999',
                                            fontSize: '0.65rem',
                                            ml: 1
                                        }}>
                                            {msg.time}
                                        </Typography>
                                    </Box>

                                    {/* Message text with reduced line height */}
                                    <Typography variant="body2" sx={{
                                        color: msg.isSystem ? '#6c757d' : 'inherit',
                                        fontSize: msg.isSystem ? '0.75rem' : '0.85rem',
                                        lineHeight: 1.3  // Reduced line height
                                    }}>
                                        {msg.text}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {/* Input area  */}
                    <Box sx={{
                        p: 1.5,
                        backgroundColor: 'white',
                        borderTop: '1px solid #f0f0f0',
                        display: 'flex',
                        gap: 1,
                        alignItems: 'flex-end'
                    }}>
                        <TextField
                            placeholder={labels[language].placeholder}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            fullWidth
                            multiline
                            maxRows={2}
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    backgroundColor: '#fafafa',
                                    fontSize: '0.9rem',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5'
                                    }
                                }
                            }}
                        />
                        {/* Send button with icon */}
                        <IconButton
                            onClick={handleSend}
                            disabled={!message.trim()}
                            sx={{
                                backgroundColor: "#7EBC89",
                                color: "white",
                                width: 40,
                                height: 40,
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: "#6BA67A"
                                },
                                '&:disabled': {
                                    backgroundColor: '#ccc'
                                }
                            }}
                        >
                            <SendIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}