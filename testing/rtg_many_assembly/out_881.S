.text

#The program checks the ALU instruction in I_type

Main:
		addi    x6 , x0 , 92 
		addi    x26 , x0 , 91 
		sltu    x20 , x6 , x26 
		bltu    x6 , x26 , Less_i 
		bgeu    x6 , x26 , Bigger_i 
Less_i:
		ori     x27 , x6 , 149 
		sub     x23 , x26 , x6 
		srai    x23 , x23 , 0 
		and     x23 , x23 , x0 
		addi    x11 , x0 , 0 
		beq     x23 , x11 , Pass 
Bigger_i:
		ori     x27 , x6 , 190 
		sub     x23 , x26 , x6 
		srai    x23 , x23 , 1 
		and     x23 , x23 , x0 
		addi    x11 , x0 , 0 
		beq     x23 , x11 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
