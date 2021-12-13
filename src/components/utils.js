export const renderLoading = (submitButtonElement, loadingStatus) => {
  if (loadingStatus) {
    submitButtonElement.textContent = 'Сохранение...';
  } else {
    submitButtonElement.textContent = 'Сохранить';
  }
}
