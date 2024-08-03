.text

#The program checks the ALU instruction in I_type

Main:
		addi    x23 , x0 , 49 
		addi    x30 , x0 , 48 
		sltu    x3 , x23 , x30 
		bltu    x23 , x30 , Less_i 
		bgeu    x23 , x30 , Bigger_i 
Less_i:
		ori     x4 , x23 , 55 
		sub     x15 , x30 , x23 
		srai    x15 , x15 , 0 
		and     x15 , x15 , x0 
		addi    x11 , x0 , 0 
		beq     x15 , x11 , Pass 
Bigger_i:
		ori     x4 , x23 , 134 
		sub     x15 , x30 , x23 
		srai    x15 , x15 , 2 
		and     x15 , x15 , x0 
		addi    x11 , x0 , 0 
		beq     x15 , x11 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
