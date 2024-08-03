.text

#The program checks the ALU instruction in I_type

Main:
		addi    x29 , x0 , 143 
		addi    x12 , x0 , 110 
		slt     x10 , x29 , x12 
		bltu    x29 , x12 , Less_i 
		bgeu    x29 , x12 , Bigger_i 
Less_i:
		ori     x30 , x29 , 61 
		sub     x9 , x12 , x29 
		srai    x9 , x9 , 3 
		and     x9 , x9 , x0 
		addi    x20 , x0 , 0 
		beq     x9 , x20 , Pass 
Bigger_i:
		ori     x30 , x29 , 99 
		sub     x9 , x12 , x29 
		srai    x9 , x9 , 3 
		and     x9 , x9 , x0 
		addi    x20 , x0 , 0 
		beq     x9 , x20 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
