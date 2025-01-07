.text

#The program checks the ALU instruction in I_type

Main:
		addi    x27 , x0 , 173 
		addi    x14 , x0 , 42 
		sltiu   x10 , x27 , 42 
		bltu    x27 , x14 , Less_i 
		bgeu    x27 , x14 , Bigger_i 
Less_i:
		ori     x2 , x27 , 64 
		sub     x29 , x14 , x27 
		srai    x29 , x29 , 0 
		and     x29 , x29 , x0 
		addi    x24 , x0 , 0 
		beq     x29 , x24 , Pass 
Bigger_i:
		ori     x2 , x27 , 145 
		sub     x29 , x14 , x27 
		srai    x29 , x29 , 1 
		and     x29 , x29 , x0 
		addi    x24 , x0 , 0 
		beq     x29 , x24 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
