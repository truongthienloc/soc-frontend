.text

#The program checks the ALU instruction in I_type

Main:
		addi    x30 , x0 , 179 
		addi    x3 , x0 , 66 
		sltiu   x1 , x30 , 66 
		bltu    x30 , x3 , Less_i 
		bgeu    x30 , x3 , Bigger_i 
Less_i:
		ori     x9 , x30 , 186 
		sub     x27 , x3 , x30 
		srai    x27 , x27 , 4 
		and     x27 , x27 , x0 
		addi    x23 , x0 , 0 
		beq     x27 , x23 , Pass 
Bigger_i:
		ori     x9 , x30 , 179 
		sub     x27 , x3 , x30 
		srai    x27 , x27 , 1 
		and     x27 , x27 , x0 
		addi    x23 , x0 , 0 
		beq     x27 , x23 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
