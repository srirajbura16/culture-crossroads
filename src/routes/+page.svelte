<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let data;
	console.log(data);
	const { question, country_name } = data;

	let message = 'play game';

	onMount(() => {
		const svg = d3.select('svg');
		const width = +svg.attr('width');
		const height = +svg.attr('height');

		const projection = d3.geoNaturalEarth1().fitSize([width, height], { type: 'Sphere' });

		d3.json(
			'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
		).then((data) => {
			// Draw the map
			svg
				.append('g')
				.selectAll('path')
				.data(data.features)
				.enter()
				.append('path')
				.attr('class', 'country')
				.attr('fill', '#69b3a2')
				.attr('d', d3.geoPath().projection(projection))
				.style('stroke', '#fff')
				.on('mouseover', function (event, d) {
					d3.select(this).attr('fill', '#8EC5B6');
				})
				.on('mouseout', function (event, d) {
					d3.select(this).attr('fill', '#69b3a2');
				})
				.on('click', (event, d) => {
					console.log(d);
					const userPick = d.properties.name.toLowerCase();
					const theAnswer = country_name.toLowerCase();

					if (userPick === theAnswer) {
						message = `Good job, you got it right! <br/> ${country_name}`;
						location.reload();
					} else {
						message = 'Try Again';
					}
					//check if countyr matches with opein ai
					console.log(d.properties.name);
				});

			svg
				.selectAll('.country')
				.append('title')
				.text((d) => d.properties.name);
		});
	});
</script>

<h2>{question}</h2>
<h3>{@html message}</h3>

<svg width="800" height="800" />
