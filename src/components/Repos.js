import React from "react";
import styled from "styled-components";
import { GithubContext, GlobalContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = GlobalContext();

  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  // MOST USED LANGUAGES
  let mostUsed = Object.values(languages);
  // this converts the languages object into an array

  mostUsed = mostUsed.sort((a, b) => {
    return b.value - a.value;
  });
  // this sorts the mostUsed array in descending order

  mostUsed = mostUsed.slice(0, 5);
  // this returns only the first 5 items in the array

  // MOST STARS PER LANGUAGES
  const mostPopular = Object.values(languages)
    .sort((a, b) => b - a)
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);
  // console.log(mostPopular);
  // the map method is used to override the value since fusion charts is looking for 'value' property and not 'stars'

  // STARS AND FORKS
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };

      return total;
    },
    { stars: {}, forks: {} }
  );
  // console.log(stars);
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  // const chartData = [
  //   {
  //     label: "HTML",
  //     value: "90",
  //   },
  //   {
  //     label: "CSS",
  //     value: "120",
  //   },
  //   {
  //     label: "javaScript",
  //     value: "280",
  //   },
  // ];
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
        {/* <ExampleChart data={chartData} /> */}
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
