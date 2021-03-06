export async function fetchHelper(route, method) {
  const fetching = await fetch(`http://localhost:3001/api/${route}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((items) => {
    return items.json();
  });
  return fetching;
}

export async function deleteHelper(route, method) {
  await fetch(`http://localhost:3001/api/${route}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function fetchHelperBody(route, method, body) {
  fetch(`http://localhost:3001/api/${route}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((items) => items.json())
    .then((items) => {
      return items;
    });
}
