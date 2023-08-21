export const getFetch = (request, currentPage, perPage) => {
  const URL_CONST = 'https://pixabay.com/api/';
  const searchParams = new URLSearchParams({
    key: '38303172-55464abc3ce065b4c50f47906',
    q: request,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: perPage,
    page: currentPage,
  });

  return fetch(`${URL_CONST}?${searchParams}`).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(
        `Якась помилка на сервері, спробуйте пізніше або оновіть сторінку`
      )
    );
  });
};
