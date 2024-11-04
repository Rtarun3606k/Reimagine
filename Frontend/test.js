const fetchData = async () => {
  const respopnse = await fetch("http://localhost:3000");
  const data = await respopnse.json();
  return data;
};
fetchData().then((data) => console.log(data));
// console.log(fetchData());
