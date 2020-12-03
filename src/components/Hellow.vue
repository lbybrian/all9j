<template>
	<div class="all">
		<div class="center">
			<h1>{{title}}</h1>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Hellow',
		data(){
			return{
				title:'安全审计系统'
			}
		},
		created(){
			
		}
	}
</script>

<style scoped="scoped">
.all{
	position: relative;
}
	.center{
		position: absolute;
		height: 400px;
		left: 500px;
		top: 200px;
		width: 600px;
		background-color: #47AFAE;
	}
	.center h1{
		text-align: center;
		line-height: 400px;
		color: white;
		font-size:65px;
		
	}
</style>