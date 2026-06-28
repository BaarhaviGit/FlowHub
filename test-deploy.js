async function run() {
  try {
    // 1. Register
    const username = 'testuser_' + Date.now();
    let res = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email: username + '@test.com',
        password: 'password'
      })
    });
    let data = await res.json();
    
    // 2. Login
    res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password: 'password'
      })
    });
    data = await res.json();
    const token = data.token;
    
    const workflowId = 1;
    console.log("Targeting workflow ID:", workflowId);
    
    // 4. Deploy
    res = await fetch(`http://localhost:8080/api/workflows/${workflowId}/deploy`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    
    const text = await res.text();
    console.log("Deploy Status:", res.status);
    console.log("Deploy Body:", text);
    
  } catch (err) {
    console.log("Script failed:", err.message);
  }
}

run();
