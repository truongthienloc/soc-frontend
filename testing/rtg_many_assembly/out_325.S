.text

#The program checks the ALU instruction in I_type

Main:
		addi    x11 , x0 , 89 
		addi    x25 , x0 , 169 
		sltiu   x3 , x11 , 169 
		bltu    x11 , x25 , Less_i 
		bgeu    x11 , x25 , Bigger_i 
Less_i:
		ori     x23 , x11 , 198 
		sub     x27 , x25 , x11 
		srai    x27 , x27 , 4 
		and     x27 , x27 , x0 
		addi    x10 , x0 , 0 
		beq     x27 , x10 , Pass 
Bigger_i:
		ori     x23 , x11 , 32 
		sub     x27 , x25 , x11 
		srai    x27 , x27 , 0 
		and     x27 , x27 , x0 
		addi    x10 , x0 , 0 
		beq     x27 , x10 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
