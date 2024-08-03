.text

#The program checks the ALU instruction in I_type

Main:
		addi    x9 , x0 , 73 
		addi    x28 , x0 , 72 
		sltu    x5 , x9 , x28 
		bltu    x9 , x28 , Less_i 
		bgeu    x9 , x28 , Bigger_i 
Less_i:
		ori     x21 , x9 , 30 
		sub     x24 , x28 , x9 
		srai    x24 , x24 , 0 
		and     x24 , x24 , x0 
		addi    x7 , x0 , 0 
		beq     x24 , x7 , Pass 
Bigger_i:
		ori     x21 , x9 , 17 
		sub     x24 , x28 , x9 
		srai    x24 , x24 , 1 
		and     x24 , x24 , x0 
		addi    x7 , x0 , 0 
		beq     x24 , x7 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
