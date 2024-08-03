.text

#The program checks the ALU instruction in I_type

Main:
		addi    x3 , x0 , 142 
		addi    x17 , x0 , 141 
		sltu    x9 , x3 , x17 
		bltu    x3 , x17 , Less_i 
		bgeu    x3 , x17 , Bigger_i 
Less_i:
		ori     x15 , x3 , 130 
		sub     x5 , x17 , x3 
		srai    x5 , x5 , 4 
		and     x5 , x5 , x0 
		addi    x1 , x0 , 0 
		beq     x5 , x1 , Pass 
Bigger_i:
		ori     x15 , x3 , 114 
		sub     x5 , x17 , x3 
		srai    x5 , x5 , 1 
		and     x5 , x5 , x0 
		addi    x1 , x0 , 0 
		beq     x5 , x1 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
