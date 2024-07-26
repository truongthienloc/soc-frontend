.text

#The program checks the ALU instruction in I_type

Main:
		addi    x7 , x0 , -2048 
		addi    x11 , x0 , 68 
		sltu    x5 , x7 , x11 
		bltu    x7 , x11 , Less_i 
		bgeu    x7 , x11 , Bigger_i 
Less_i:
		ori     x29 , x7 , 132 
		sub     x13 , x11 , x7 
		srai    x13 , x13 , 0 
		and     x13 , x13 , x0 
		addi    x31 , x0 , 0 
		beq     x13 , x31 , Pass 
Bigger_i:
		ori     x29 , x7 , 41 
		sub     x13 , x11 , x7 
		srai    x13 , x13 , 2 
		and     x13 , x13 , x0 
		addi    x31 , x0 , 0 
		beq     x13 , x31 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
