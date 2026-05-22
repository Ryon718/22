// api/voice-handler.js

const twilio = require('twilio');

/**
 * 这个函数会被 Vercel 调用，当你的前端请求它时。
 * @param {object} req - HTTP 请求对象 (包含方法、body 等)
 * @param {object} res - HTTP 响应对象
 */
module.exports = async (req, res) => {
    // 1. 检查请求方法是否是 GET (Twilio 通常使用 GET 来触发 Webhook)
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }

    console.log("✅ Vercel/Netlify 接收到 Twilio 的请求！");

    // 2. 创建 TwiML 对象
    const twiml = new twilio.twiml.VoiceResponse();
    
    // --- ⭐⭐⭐ 在这里配置你的轰炸逻辑 ⭐⭐⭐ ---
    
    // 示例：播放语音并等待 5 秒后挂断
    twiml.say({ voice: 'Polly.Joanna' }, '您好，这是一个自动电话轰炸测试。');
    twiml.pause({ length: 5 }); // 等待 5 秒

    // 如果你想让它持续等待用户输入：
    /*
    twiml.gather({ numDigits: 1, action: '/handle-input' }); // 收集一个数字，并请求到 /handle-input 这个路径
    twiml.say('请按任意数字键结束通话。');
    */

    // 3. 将 TwiML 返回给 Twilio 服务器
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
};
