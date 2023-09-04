<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	// export let data;
	// console.log(data);
	// const { question, country_name } = data;

	const country_name = 'China';

	let message = 'play game';

	onMount(() => {
		const svg = d3.select('svg');
		const width = +svg.attr('width');
		const height = +svg.attr('height');
		const initialScale = 1;
		const zoomExtent = 5;
		const translateExtent = [
			[-(width * zoomExtent), -(height * zoomExtent)],
			[width * zoomExtent, height * zoomExtent]
		];

		const projection = d3.geoNaturalEarth1().fitSize([width, height], { type: 'Sphere' });

		const zoom = d3
			.zoom()
			.scaleExtent([initialScale, zoomExtent])
			.translateExtent(translateExtent)
			.on('zoom', zoomed);

		svg.call(zoom);

		svg
			.append('rect')
			.attr('width', width)
			.attr('height', height)
			.style('stroke', 'black')
			.style('fill', 'none')
			.style('stroke-width', 1);

		const mapGroup = svg.append('g').attr('clip-path', 'url(#clip)');

		function zoomed(event) {
			mapGroup.attr('transform', event.transform);
		}

		d3.json(
			'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
		).then((data) => {
			// Draw the map
			mapGroup
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

<div class="text-center">
	<h1 class="font-extrabold leading-none tracking-tight text-gray-900 text-3xl">
		Place holder question. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, soluta?
	</h1>
	<h3>{@html message}</h3>
	<div class=" flex justify-center items-center h-screen">
		<svg width="836" height="416" class="block" />
	</div>
</div>
