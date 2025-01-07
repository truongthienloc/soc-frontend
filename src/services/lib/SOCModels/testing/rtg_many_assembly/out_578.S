.text

#The program checks the ALU instruction in I_type

Main:
		addi    x11 , x0 , 171 
		addi    x27 , x0 , 193 
		slt     x26 , x11 , x27 
		bltu    x11 , x27 , Less_i 
		bgeu    x11 , x27 , Bigger_i 
Less_i:
		ori     x19 , x11 , 46 
		sub     x10 , x27 , x11 
		srai    x10 , x10 , 4 
		and     x10 , x10 , x0 
		addi    x15 , x0 , 0 
		beq     x10 , x15 , Pass 
Bigger_i:
		ori     x19 , x11 , 98 
		sub     x10 , x27 , x11 
		srai    x10 , x10 , 3 
		and     x10 , x10 , x0 
		addi    x15 , x0 , 0 
		beq     x10 , x15 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
