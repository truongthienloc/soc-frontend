.text

#The program checks the ALU instruction in I_type

Main:
		addi    x6 , x0 , 90 
		addi    x7 , x0 , 89 
		sltu    x31 , x6 , x7 
		bltu    x6 , x7 , Less_i 
		bgeu    x6 , x7 , Bigger_i 
Less_i:
		ori     x21 , x6 , 73 
		sub     x28 , x7 , x6 
		srai    x28 , x28 , 2 
		and     x28 , x28 , x0 
		addi    x20 , x0 , 0 
		beq     x28 , x20 , Pass 
Bigger_i:
		ori     x21 , x6 , 99 
		sub     x28 , x7 , x6 
		srai    x28 , x28 , 4 
		and     x28 , x28 , x0 
		addi    x20 , x0 , 0 
		beq     x28 , x20 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
