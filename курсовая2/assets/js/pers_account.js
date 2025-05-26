        // Обработчики для модального окна
        document.querySelectorAll('.view-details-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              document.getElementById('orderDetailsModal').style.display = 'block';
          });
      });
      
      document.querySelector('.close-modal').addEventListener('click', function() {
          document.getElementById('orderDetailsModal').style.display = 'none';
      });
      
      window.addEventListener('click', function(event) {
          if (event.target == document.getElementById('orderDetailsModal')) {
              document.getElementById('orderDetailsModal').style.display = 'none';
          }
      });
      
      // Переключение видимости пароля
      document.querySelector('.show-password-btn').addEventListener('click', function(e) {
          e.preventDefault();
          const field = document.querySelector('.password-field .field-value');
          if (field.textContent === '••••••••') {
              field.textContent = 'mysecretpassword';
              this.textContent = 'Скрыть';
          } else {
              field.textContent = '••••••••';
              this.textContent = 'Показать';
          }
      });