.text

#The program checks the ALU instruction in I_type

Main:
		addi    x20 , x0 , 161 
		addi    x11 , x0 , 55 
		slt     x24 , x20 , x11 
		bltu    x20 , x11 , Less_i 
		bgeu    x20 , x11 , Bigger_i 
Less_i:
		ori     x25 , x20 , 65 
		sub     x23 , x11 , x20 
		srai    x23 , x23 , 0 
		and     x23 , x23 , x0 
		addi    x9 , x0 , 0 
		beq     x23 , x9 , Pass 
Bigger_i:
		ori     x25 , x20 , 72 
		sub     x23 , x11 , x20 
		srai    x23 , x23 , 2 
		and     x23 , x23 , x0 
		addi    x9 , x0 , 0 
		beq     x23 , x9 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
