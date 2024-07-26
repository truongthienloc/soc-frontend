.text

#The program checks the ALU instruction in I_type

Main:
		addi    x13 , x0 , 132 
		addi    x7 , x0 , -2048 
		slti    x24 , x13 , 986 
		bltu    x13 , x7 , Less_i 
		bgeu    x13 , x7 , Bigger_i 
Less_i:
		ori     x31 , x13 , 150 
		sub     x9 , x7 , x13 
		srai    x9 , x9 , 2 
		and     x9 , x9 , x0 
		addi    x11 , x0 , 0 
		beq     x9 , x11 , Pass 
Bigger_i:
		ori     x31 , x13 , 45 
		sub     x9 , x7 , x13 
		srai    x9 , x9 , 3 
		and     x9 , x9 , x0 
		addi    x11 , x0 , 0 
		beq     x9 , x11 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
