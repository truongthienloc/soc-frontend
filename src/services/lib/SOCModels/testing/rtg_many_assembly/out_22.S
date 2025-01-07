.text

#The program checks the ALU instruction in I_type

Main:
		addi    x10 , x0 , 193 
		addi    x7 , x0 , 190 
		sltiu   x31 , x10 , 190 
		bltu    x10 , x7 , Less_i 
		bgeu    x10 , x7 , Bigger_i 
Less_i:
		ori     x11 , x10 , 122 
		sub     x27 , x7 , x10 
		srai    x27 , x27 , 2 
		and     x27 , x27 , x0 
		addi    x25 , x0 , 0 
		beq     x27 , x25 , Pass 
Bigger_i:
		ori     x11 , x10 , 136 
		sub     x27 , x7 , x10 
		srai    x27 , x27 , 3 
		and     x27 , x27 , x0 
		addi    x25 , x0 , 0 
		beq     x27 , x25 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
