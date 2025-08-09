// netlify/functions/hello.js
exports.handler = async (event, context) => {
    const { clientContext } = context;
    const user = clientContext && clientContext.user;
  
    if (!user) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: '未授權，請先登入。' })
      };
    }
  
    // 亦可在此做角色或自訂權限檢查（例如 app_metadata.roles）
    const name = (user.user_metadata && user.user_metadata.full_name) || user.email;
  
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Hello ${name}！你已成功以 JWT 存取受保護的 API。`,
        email: user.email,
        user_id: user.sub
      })
    };
  };
  