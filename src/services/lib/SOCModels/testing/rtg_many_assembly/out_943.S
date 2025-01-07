.text

#The program checks the ALU instruction in I_type

Main:
		addi    x10 , x0 , 17 
		addi    x7 , x0 , 16 
		sltu    x15 , x10 , x7 
		bltu    x10 , x7 , Less_i 
		bgeu    x10 , x7 , Bigger_i 
Less_i:
		ori     x5 , x10 , 28 
		sub     x16 , x7 , x10 
		srai    x16 , x16 , 4 
		and     x16 , x16 , x0 
		addi    x13 , x0 , 0 
		beq     x16 , x13 , Pass 
Bigger_i:
		ori     x5 , x10 , 188 
		sub     x16 , x7 , x10 
		srai    x16 , x16 , 2 
		and     x16 , x16 , x0 
		addi    x13 , x0 , 0 
		beq     x16 , x13 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
