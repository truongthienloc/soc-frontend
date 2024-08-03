.text

#The program checks the ALU instruction in I_type

Main:
		addi    x6 , x0 , 128 
		addi    x2 , x0 , -2048 
		slti    x5 , x6 , 403 
		bltu    x6 , x2 , Less_i 
		bgeu    x6 , x2 , Bigger_i 
Less_i:
		ori     x19 , x6 , 47 
		sub     x3 , x2 , x6 
		srai    x3 , x3 , 1 
		and     x3 , x3 , x0 
		addi    x17 , x0 , 0 
		beq     x3 , x17 , Pass 
Bigger_i:
		ori     x19 , x6 , 140 
		sub     x3 , x2 , x6 
		srai    x3 , x3 , 3 
		and     x3 , x3 , x0 
		addi    x17 , x0 , 0 
		beq     x3 , x17 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
