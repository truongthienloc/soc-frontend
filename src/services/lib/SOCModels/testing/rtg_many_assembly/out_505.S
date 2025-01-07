.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , 169 
		addi    x12 , x0 , 76 
		slt     x24 , x22 , x12 
		bltu    x22 , x12 , Less_i 
		bgeu    x22 , x12 , Bigger_i 
Less_i:
		ori     x8 , x22 , 124 
		sub     x7 , x12 , x22 
		srai    x7 , x7 , 0 
		and     x7 , x7 , x0 
		addi    x29 , x0 , 0 
		beq     x7 , x29 , Pass 
Bigger_i:
		ori     x8 , x22 , 79 
		sub     x7 , x12 , x22 
		srai    x7 , x7 , 4 
		and     x7 , x7 , x0 
		addi    x29 , x0 , 0 
		beq     x7 , x29 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
