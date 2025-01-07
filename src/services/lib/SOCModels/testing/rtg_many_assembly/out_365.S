.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 170 
		addi    x31 , x0 , 169 
		sltu    x13 , x12 , x31 
		bltu    x12 , x31 , Less_i 
		bgeu    x12 , x31 , Bigger_i 
Less_i:
		ori     x20 , x12 , 53 
		sub     x11 , x31 , x12 
		srai    x11 , x11 , 4 
		and     x11 , x11 , x0 
		addi    x15 , x0 , 0 
		beq     x11 , x15 , Pass 
Bigger_i:
		ori     x20 , x12 , 58 
		sub     x11 , x31 , x12 
		srai    x11 , x11 , 0 
		and     x11 , x11 , x0 
		addi    x15 , x0 , 0 
		beq     x11 , x15 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
