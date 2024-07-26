.text

#The program checks the ALU instruction in I_type

Main:
		addi    x15 , x0 , 145 
		addi    x30 , x0 , 144 
		sltu    x17 , x15 , x30 
		bltu    x15 , x30 , Less_i 
		bgeu    x15 , x30 , Bigger_i 
Less_i:
		ori     x11 , x15 , 63 
		sub     x21 , x30 , x15 
		srai    x21 , x21 , 4 
		and     x21 , x21 , x0 
		addi    x14 , x0 , 0 
		beq     x21 , x14 , Pass 
Bigger_i:
		ori     x11 , x15 , 20 
		sub     x21 , x30 , x15 
		srai    x21 , x21 , 3 
		and     x21 , x21 , x0 
		addi    x14 , x0 , 0 
		beq     x21 , x14 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
