const hp1 = document.getElementById('hp1');
const hp2 = document.getElementById('hp2');
const hpValue1 = document.getElementById('hp-value1');
const hpValue2 = document.getElementById('hp-value2');
const damageInput1 = document.getElementById('damage1');
const damageInput2 = document.getElementById('damage2');
const attackButton = document.getElementById('attack-button');
const healButton1 = document.getElementById('heal-button1');
const healButton2 = document.getElementById('heal-button2');

let currentHP1 = 500;
let currentHP2 = 500;
const maxHP = 1000;

attackButton.addEventListener('click', () => {
    const damage1 = parseInt(damageInput1.value) || 0;
    const damage2 = parseInt(damageInput2.value) || 0;

    // Efek dan pengurangan HP untuk Player 1 (terkena damage dari Player 2)
    if (damage2 > 0) { // Hanya beri efek jika ada damage
        hp1.classList.add('shake', 'damage-effect');
        setTimeout(() => {
            hp1.classList.remove('shake');
            setTimeout(() => {
                hp1.classList.remove('damage-effect');
            }, 100);
        }, 300);
    }

    // Efek dan pengurangan HP untuk Player 2 (terkena damage dari Player 1)
    if (damage1 > 0) { // Hanya beri efek jika ada damage
        hp2.classList.add('shake', 'damage-effect');
        setTimeout(() => {
            hp2.classList.remove('shake');
            setTimeout(() => {
                hp2.classList.remove('damage-effect');
            }, 100);
        }, 300);
    }

    currentHP1 -= damage2;
    currentHP2 -= damage1;

    updateHP();
});

healButton1.addEventListener('click', () => {
    currentHP1 += 120;
    if (currentHP1 > maxHP) {
        currentHP1 = maxHP;
    }
    updateHP();
});

healButton2.addEventListener('click', () => {
    currentHP2 += 120;
    if (currentHP2 > maxHP) {
        currentHP2 = maxHP;
    }
    updateHP();
});

function updateHP() {
    hp1.style.width = (currentHP1 / maxHP * 100) + '%';
    hp2.style.width = (currentHP2 / maxHP * 100) + '%';
    hpValue1.textContent = currentHP1 + '/' + maxHP;
    hpValue2.textContent = currentHP2 + '/' + maxHP;

    if (currentHP1 <= 0) {
        Swal.fire({
            title: 'Gilang Menang!',
            icon: 'success',
            confirmButtonText: 'Main Lagi'
        }).then((result) => {
            if (result.isConfirmed) {
                resetGame();
            }
        });
    } else if (currentHP2 <= 0) {
        Swal.fire({
            title: 'Oki Menang!',
            icon: 'success',
            confirmButtonText: 'Main Lagi'
        }).then((result) => {
            if (result.isConfirmed) {
                resetGame();
            }
        });
    }
}

function resetGame() {
    currentHP1 = maxHP;
    currentHP2 = maxHP;
    updateHP();
    damageInput1.value = "";
    damageInput2.value = "";
}