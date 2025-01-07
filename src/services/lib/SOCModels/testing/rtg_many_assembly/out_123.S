.text

#The program checks the ALU instruction in I_type

Main:
		addi    x7 , x0 , 30 
		addi    x1 , x0 , 29 
		sltu    x6 , x7 , x1 
		bltu    x7 , x1 , Less_i 
		bgeu    x7 , x1 , Bigger_i 
Less_i:
		ori     x13 , x7 , 156 
		sub     x15 , x1 , x7 
		srai    x15 , x15 , 1 
		and     x15 , x15 , x0 
		addi    x20 , x0 , 0 
		beq     x15 , x20 , Pass 
Bigger_i:
		ori     x13 , x7 , 172 
		sub     x15 , x1 , x7 
		srai    x15 , x15 , 2 
		and     x15 , x15 , x0 
		addi    x20 , x0 , 0 
		beq     x15 , x20 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
