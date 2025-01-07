.text

#The program checks the ALU instruction in I_type

Main:
		addi    x6 , x0 , 11 
		addi    x20 , x0 , 10 
		sltu    x16 , x6 , x20 
		bltu    x6 , x20 , Less_i 
		bgeu    x6 , x20 , Bigger_i 
Less_i:
		ori     x7 , x6 , 1 
		sub     x1 , x20 , x6 
		srai    x1 , x1 , 1 
		and     x1 , x1 , x0 
		addi    x9 , x0 , 0 
		beq     x1 , x9 , Pass 
Bigger_i:
		ori     x7 , x6 , 193 
		sub     x1 , x20 , x6 
		srai    x1 , x1 , 0 
		and     x1 , x1 , x0 
		addi    x9 , x0 , 0 
		beq     x1 , x9 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
