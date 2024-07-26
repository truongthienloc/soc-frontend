.text

#The program checks the ALU instruction in I_type

Main:
		addi    x24 , x0 , 48 
		addi    x8 , x0 , -2048 
		slti    x5 , x24 , 544 
		bltu    x24 , x8 , Less_i 
		bgeu    x24 , x8 , Bigger_i 
Less_i:
		ori     x25 , x24 , 53 
		sub     x13 , x8 , x24 
		srai    x13 , x13 , 1 
		and     x13 , x13 , x0 
		addi    x12 , x0 , 0 
		beq     x13 , x12 , Pass 
Bigger_i:
		ori     x25 , x24 , 43 
		sub     x13 , x8 , x24 
		srai    x13 , x13 , 3 
		and     x13 , x13 , x0 
		addi    x12 , x0 , 0 
		beq     x13 , x12 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
