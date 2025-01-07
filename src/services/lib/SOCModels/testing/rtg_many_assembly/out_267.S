.text

#The program checks the ALU instruction in I_type

Main:
		addi    x3 , x0 , 63 
		addi    x15 , x0 , 62 
		sltu    x19 , x3 , x15 
		bltu    x3 , x15 , Less_i 
		bgeu    x3 , x15 , Bigger_i 
Less_i:
		ori     x27 , x3 , 114 
		sub     x24 , x15 , x3 
		srai    x24 , x24 , 4 
		and     x24 , x24 , x0 
		addi    x13 , x0 , 0 
		beq     x24 , x13 , Pass 
Bigger_i:
		ori     x27 , x3 , 118 
		sub     x24 , x15 , x3 
		srai    x24 , x24 , 3 
		and     x24 , x24 , x0 
		addi    x13 , x0 , 0 
		beq     x24 , x13 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
