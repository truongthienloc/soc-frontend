.text

#The program checks the ALU instruction in I_type

Main:
		addi    x24 , x0 , 96 
		addi    x30 , x0 , -2048 
		slti    x15 , x24 , 365 
		bltu    x24 , x30 , Less_i 
		bgeu    x24 , x30 , Bigger_i 
Less_i:
		ori     x17 , x24 , 156 
		sub     x11 , x30 , x24 
		srai    x11 , x11 , 1 
		and     x11 , x11 , x0 
		addi    x19 , x0 , 0 
		beq     x11 , x19 , Pass 
Bigger_i:
		ori     x17 , x24 , 4 
		sub     x11 , x30 , x24 
		srai    x11 , x11 , 4 
		and     x11 , x11 , x0 
		addi    x19 , x0 , 0 
		beq     x11 , x19 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
