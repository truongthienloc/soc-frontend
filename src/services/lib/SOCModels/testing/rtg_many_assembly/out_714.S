.text

#The program checks the ALU instruction in I_type

Main:
		addi    x15 , x0 , 6 
		addi    x13 , x0 , -2048 
		slti    x1 , x15 , 735 
		bltu    x15 , x13 , Less_i 
		bgeu    x15 , x13 , Bigger_i 
Less_i:
		ori     x29 , x15 , 108 
		sub     x3 , x13 , x15 
		srai    x3 , x3 , 3 
		and     x3 , x3 , x0 
		addi    x24 , x0 , 0 
		beq     x3 , x24 , Pass 
Bigger_i:
		ori     x29 , x15 , 188 
		sub     x3 , x13 , x15 
		srai    x3 , x3 , 2 
		and     x3 , x3 , x0 
		addi    x24 , x0 , 0 
		beq     x3 , x24 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
