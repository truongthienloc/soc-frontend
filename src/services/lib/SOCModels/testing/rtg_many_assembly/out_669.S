.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 65 
		addi    x20 , x0 , 64 
		sltu    x27 , x12 , x20 
		bltu    x12 , x20 , Less_i 
		bgeu    x12 , x20 , Bigger_i 
Less_i:
		ori     x2 , x12 , 77 
		sub     x7 , x20 , x12 
		srai    x7 , x7 , 4 
		and     x7 , x7 , x0 
		addi    x30 , x0 , 0 
		beq     x7 , x30 , Pass 
Bigger_i:
		ori     x2 , x12 , 79 
		sub     x7 , x20 , x12 
		srai    x7 , x7 , 2 
		and     x7 , x7 , x0 
		addi    x30 , x0 , 0 
		beq     x7 , x30 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
