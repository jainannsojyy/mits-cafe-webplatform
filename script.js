let orderTray = [];


document.getElementById('menuTrack').addEventListener('click', function(e) {
    const card = e.target.closest('.menu-item');
    if (!card) return;

    
    const name = card.getAttribute('data-name');
    const price = parseInt(card.getAttribute('data-price'));
    const emoji = card.getAttribute('data-emoji');

    addToTray(name, price, emoji);
});

function addToTray(name, price, emoji) {
    orderTray.push({ name, price, emoji, id: Date.now() + Math.random() });
    updateTrayUI();
}

function removeFromTray(itemId) {
    orderTray = orderTray.filter(item => item.id !== itemId);
    updateTrayUI();
}

function updateTrayUI() {
    const trayList = document.getElementById('trayList');
    const totalBillDisplay = document.getElementById('totalBill');
    const confirmBtn = document.getElementById('btnConfirmOrder');

    trayList.innerHTML = '';
    let currentTotal = 0;

    if (orderTray.length === 0) {
        trayList.innerHTML = `<p class="empty-msg">Tray is empty. Click items above to add!</p>`;
        totalBillDisplay.textContent = '₹0';
        confirmBtn.disabled = true;
        return;
    }

    orderTray.forEach(item => {
        currentTotal += item.price;

        const li = document.createElement('li');
        li.className = 'tray-row';
        li.innerHTML = `
            <span>${item.emoji} <strong>${item.name}</strong> - ₹${item.price}</span>
            <button class="remove-btn">X</button>
        `;

        li.querySelector('.remove-btn').addEventListener('click', () => removeFromTray(item.id));
        trayList.appendChild(li);
    });

    totalBillDisplay.textContent = `₹${currentTotal}`;
    confirmBtn.disabled = false;
}


document.getElementById('btnConfirmOrder').addEventListener('click', function() {
    const totalBill = document.getElementById('totalBill').textContent;
    
    
    alert(`🛒 ORDER NOTED SUCCESS!\n\nTotal Basket Cash: ${totalBill}\n\n👉 Instruction: Order now, pay and take delivery at MITS Cafe! Please show this tray summary confirmation at the counter.`);
    
    
    orderTray = [];
    updateTrayUI();
});


document.getElementById('addItemForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const emoji = document.getElementById('itemEmoji').value;
    const menuTrack = document.getElementById('menuTrack');

    
    const card1 = createItemCard(name, price, emoji);
    const card2 = createItemCard(name, price, emoji);

    const halfIndex = menuTrack.children.length / 2;
    menuTrack.insertBefore(card1, menuTrack.children[halfIndex]);
    menuTrack.appendChild(card2);

    
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
});

function createItemCard(name, price, emoji) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.setAttribute('data-name', name);
    div.setAttribute('data-price', price);
    div.setAttribute('data-emoji', emoji);

    div.innerHTML = `
        <span class="item-emoji">${emoji}</span>
        <span class="item-name">${name}</span>
        <span class="item-price">₹${price}</span>
    `;
    return div;
}
