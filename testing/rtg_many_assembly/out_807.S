.text

#The program checks the ALU instruction in I_type

Main:
		addi    x25 , x0 , 27 
		addi    x13 , x0 , 148 
		sltiu   x1 , x25 , 148 
		bltu    x25 , x13 , Less_i 
		bgeu    x25 , x13 , Bigger_i 
Less_i:
		ori     x3 , x25 , 48 
		sub     x29 , x13 , x25 
		srai    x29 , x29 , 2 
		and     x29 , x29 , x0 
		addi    x2 , x0 , 0 
		beq     x29 , x2 , Pass 
Bigger_i:
		ori     x3 , x25 , 19 
		sub     x29 , x13 , x25 
		srai    x29 , x29 , 4 
		and     x29 , x29 , x0 
		addi    x2 , x0 , 0 
		beq     x29 , x2 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
