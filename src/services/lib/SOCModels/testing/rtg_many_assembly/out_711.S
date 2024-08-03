.text

#The program checks the ALU instruction in I_type

Main:
		addi    x2 , x0 , -2048 
		addi    x26 , x0 , 114 
		sltu    x24 , x2 , x26 
		bltu    x2 , x26 , Less_i 
		bgeu    x2 , x26 , Bigger_i 
Less_i:
		ori     x16 , x2 , 30 
		sub     x15 , x26 , x2 
		srai    x15 , x15 , 0 
		and     x15 , x15 , x0 
		addi    x17 , x0 , 0 
		beq     x15 , x17 , Pass 
Bigger_i:
		ori     x16 , x2 , 184 
		sub     x15 , x26 , x2 
		srai    x15 , x15 , 4 
		and     x15 , x15 , x0 
		addi    x17 , x0 , 0 
		beq     x15 , x17 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
