.text

#The program checks the ALU instruction in I_type

Main:
		addi    x9 , x0 , 132 
		addi    x10 , x0 , -2048 
		slti    x23 , x9 , 994 
		bltu    x9 , x10 , Less_i 
		bgeu    x9 , x10 , Bigger_i 
Less_i:
		ori     x13 , x9 , 136 
		sub     x4 , x10 , x9 
		srai    x4 , x4 , 0 
		and     x4 , x4 , x0 
		addi    x22 , x0 , 0 
		beq     x4 , x22 , Pass 
Bigger_i:
		ori     x13 , x9 , 53 
		sub     x4 , x10 , x9 
		srai    x4 , x4 , 1 
		and     x4 , x4 , x0 
		addi    x22 , x0 , 0 
		beq     x4 , x22 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
