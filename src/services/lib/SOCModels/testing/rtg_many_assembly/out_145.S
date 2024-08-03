.text

#The program checks the ALU instruction in I_type

Main:
		addi    x29 , x0 , 152 
		addi    x16 , x0 , 85 
		sltiu   x3 , x29 , 85 
		bltu    x29 , x16 , Less_i 
		bgeu    x29 , x16 , Bigger_i 
Less_i:
		ori     x21 , x29 , 38 
		sub     x27 , x16 , x29 
		srai    x27 , x27 , 2 
		and     x27 , x27 , x0 
		addi    x12 , x0 , 0 
		beq     x27 , x12 , Pass 
Bigger_i:
		ori     x21 , x29 , 184 
		sub     x27 , x16 , x29 
		srai    x27 , x27 , 4 
		and     x27 , x27 , x0 
		addi    x12 , x0 , 0 
		beq     x27 , x12 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
