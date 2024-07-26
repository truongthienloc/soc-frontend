.text

#The program finds the value of fibonacci 

Fibo:
		addi    x21 , x0 , 6 // 0 
		addi    x24 , x0 , 1 // 4
		addi    x26 , x0 , 1 // 8
		addi    x12 , x0 , 3 //12
		beq     x21 , x0 , Result0 // 16
		beq     x21 , x26 , Result1 //20
Loop: 
		blt     x21 , x12 , Result // 24	
		add     x1 , x24 , x26 // 28
		addi    x24 , x26 , 0 //32
		addi    x26 , x1 , 0 //36
		addi    x12 , x12 , 1 //40
		jal     x0 , Loop //44
Result0:
		addi    x1 , x0 , 0 //48
		addi    x18 , x0 , 0 //52
		bne     x1 , x18 , Fail // 56
Result1:
		addi    x1 , x0 , 1 // 60 
		addi    x5 , x0 , 1 // 64
		bne     x1 , x5 , Fail // 68
Result:
		addi    x10 , x0 , 8 // 72
		bne     x1 , x10 , Result1 // 76 

Pass: 
		addi    x1 , x0 , 084 //80
		jal     x0 , End // 	
Fail: 
		addi    x1 , x0 , 070 // 88 
End: 
