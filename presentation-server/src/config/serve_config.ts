export default  {
    port: 3000,
    host: 'localhost',
    ctx_root: '/',
    session_config: {
        name: 'my_session.sid',
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    }
}