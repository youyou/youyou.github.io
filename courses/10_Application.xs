func Prime(N)
{
	print("计算",N,"以内的素数");

	a = Object();

	h = N/2;

	for(i=1;i<=N;i+=1)
		a[i] = 0;

	for(i=2;i<=h;i+=1)
	{
		max_j = N / i;
		
		for(j=2;j<=max_j;j+=1)
		{
			v = i*j;
			if(v<=N)
				a[v] = 1;
		}
	}
	
	count = 0;
	
	for(i=1;i<=N;i+=1)
	{
		if(a[i]==0)
		{
			print(i);
			count += 1;
		}
	}
	
	print( N, "以内总计", count, "个素数！");
}

Prime(100);