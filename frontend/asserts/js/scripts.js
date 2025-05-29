document.addEventListener('DOMContentLoaded', () => {
    console.log('Loyiha 5 script yuklandi!');

    // Dashboard uchun foydalanuvchi ismini ko'rsatish va chiqish tugmasi logikasi
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
        const username = localStorage.getItem('foydalanuvchi_nomi');
        if (username) {
            usernameDisplay.textContent = `Salom, ${username}!`;
        }
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('foydalanuvchi_nomi');
            window.location.href = '../pages/signin.html';
        });
    }

    // crud.html uchun postlarni olish va ko'rsatish
    const postTable = document.getElementById('data-table');
    if (postTable) {
        loadPosts();
        const form = document.getElementById('crud-form');
        if (form) {
            form.addEventListener('submit', savePost);
            const cancelEditBtn = document.getElementById('cancel-edit');
            if (cancelEditBtn) {
                cancelEditBtn.addEventListener('click', clearForm);
            }
        }
    }

    function loadPosts() {
        fetch('/api/api_1/posts/') // Sizning API manzilingizga moslang (Loyiha 5)
            .then(response => response.json())
            .then(data => displayPosts(data))
            .catch(error => console.error('Postlarni olishda xatolik (Loyiha 5):', error));
    }

    function displayPosts(posts) {
        const tbody = document.getElementById('data-body');
        if (tbody) {
            tbody.innerHTML = '';
            posts.forEach(post => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.content}</td>
                    <td>
                        <button onclick="editPost(${post.id})">Tahrirlash</button>
                        <button onclick="deletePost(${post.id})">O'chirish</button>
                    </td>
                `;
            });
        }
    }

    function savePost(event) {
        event.preventDefault();
        const titleInput = document.getElementById('title');
        const contentInput = document.getElementById('content');
        const idInput = document.getElementById('id');
        if (titleInput && contentInput && idInput) {
            const title = titleInput.value;
            const content = contentInput.value;
            const id = idInput.value;

            const postData = { title: title, content: content };
            const method = id ? 'PUT' : 'POST';
            const url = id ? `/api/api_1/posts/${id}/` : '/api/api_1/posts/'; // Sizning API manzilingizga moslang (Loyiha 5)

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    // Agar kerak bo'lsa, token qo'shing: 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(postData),
            })
            .then(response => response.json())
            .then(() => {
                loadPosts();
                clearForm();
            })
            .catch(error => console.error('Postni saqlashda xatolik (Loyiha 5):', error));
        }
    }

    function editPost(id) {
        fetch(`/api/api_1/posts/${id}/`) // Sizning API manzilingizga moslang (Loyiha 5)
            .then(response => response.json())
            .then(post => {
                document.getElementById('id').value = post.id;
                document.getElementById('title').value = post.title;
                document.getElementById('content').value = post.content;
                const cancelEditBtn = document.getElementById('cancel-edit');
                if (cancelEditBtn) {
                    cancelEditBtn.style.display = 'inline';
                }
            })
            .catch(error => console.error('Postni olishda xatolik (Loyiha 5):', error));
    }

    function deletePost(id) {
        if (confirm('Postni o\'chirishga ishonchingiz komilmi?')) {
            fetch(`/api/api_1/posts/${id}/`, { // Sizning API manzilingizga moslang (Loyiha 5)
                method: 'DELETE',
                // Agar kerak bo'lsa, token qo'shing: 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            })
            .then(() => loadPosts())
            .catch(error => console.error('Postni o\'chirishda xatolik (Loyiha 5):', error));
        }
    }

    function clearForm() {
        const form = document.getElementById('crud-form');
        if (form) {
            form.reset();
            document.getElementById('id').value = '';
            const cancelEditBtn = document.getElementById('cancel-edit');
            if (cancelEditBtn) {
                cancelEditBtn.style.display = 'none';
            }
        }
    }

    // Dashboard uchun izohlarni olish va ko'rsatish (dashboard.html)
    const commentTable = document.getElementById('comment-table');
    if (commentTable) {
        loadComments();
    }

    function loadComments() {
        fetch('/api/api_2/comments/') // Sizning API manzilingizga moslang (Loyiha 5)
            .then(response => response.json())
            .then(data => displayComments(data))
            .catch(error => console.error('Izohlarni olishda xatolik (Loyiha 5):', error));
    }

    function displayComments(comments) {
        const tbody = document.getElementById('comment-body');
        if (tbody) {
            tbody.innerHTML = '';
            comments.forEach(comment => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${comment.post}</td>
                    <td>${comment.text}</td>
                `;
            });
        }
    }
});
